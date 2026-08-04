# BOM - Delivery

## Problem Definition

A Bill of Materials (BOM) describes how a top-level product is assembled from sub-parts, which may themselves be assemblies of further sub-parts, forming a tree. Two classic recursive-aggregation questions arise from a BOM:

1. **Quantity explosion**: given an order for some quantity of the top-level product, how many units of each part (down to the raw materials) are actually needed? This is a recursive `Sum` down the tree, multiplying quantities at each level.
2. **Delivery time**: how long until the product can be delivered? Each assembly can only be built once all of its sub-parts are ready, so its delivery time is its own assembly time plus the *slowest* (maximum) delivery time among its sub-parts — a recursive `Max`, i.e. a critical-path computation.

## Test Data

```
Order("Bike", 10);

Contains("Bike", "Wheel", 2);
Contains("Bike", "Frame", 1);
Contains("Wheel", "Spoke", 32);
Contains("Wheel", "Tire", 1);

RawLeadTime("Spoke", 2);
RawLeadTime("Tire", 5);
RawLeadTime("Frame", 7);

AssemblyTime("Wheel", 1);
AssemblyTime("Bike", 2);
```

## Solution

```
# Quantity explosion: multiply required quantity down through the tree
Needed(part) += qty :- Order(part, qty);
Needed(sub) += q * subqty :- Contains(part, sub, subqty), q = Needed(part);

# Delivery time: raw parts have a fixed lead time...
DeliveryTime(part) Max= t :- RawLeadTime(part, t);

# ...assemblies take their own assembly time plus the slowest sub-part
DeliveryTime(assembly) Max= at + DeliveryTime(sub) :-
  Contains(assembly, sub, _),
  AssemblyTime(assembly, at);
```

## Expected Results

For quantities needed:
```
+-------+--------------+
| col0  | logica_value |
+-------+--------------+
| Bike  | 10           |
| Frame | 10           |
| Spoke | 640          |
| Tire  | 20           |
| Wheel | 20           |
+-------+--------------+
```

Each of the 10 bikes needs 2 wheels and 1 frame, so 20 wheels and 10 frames are needed; each of those 20 wheels needs 32 spokes and 1 tire, so 640 spokes and 20 tires are needed.

For delivery time:
```
+-------+--------------+
| col0  | logica_value |
+-------+--------------+
| Bike  | 9            |
| Frame | 7            |
| Spoke | 2            |
| Tire  | 5            |
| Wheel | 6            |
+-------+--------------+
```

A wheel takes 1 day to assemble once its slowest component (the 5-day tire) is ready, so 6 days total. A bike takes 2 days to assemble once its slowest component is ready — and since the 7-day frame is slower than the 6-day wheel, the bike's delivery time is 2 + 7 = 9 days.
