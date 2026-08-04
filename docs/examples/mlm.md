# Multi-Level Marketing Network Bonus Calculation (MLM)

## Problem Definition

In a multi-level marketing network, each member recruits other members, forming a recruitment tree. A member earns their own sales, plus a decayed share of the bonus earned by everyone they've personally recruited (who, in turn, already includes a decayed share of their own recruits' bonuses, and so on down the tree). This makes bonus computation a recursive aggregation over the recruitment tree: the payout for the whole downline collapses up towards the root, shrinking by a fixed decay factor at every level.

## Test Data

```
# Recruit(sponsor, member): sponsor personally recruited member
Recruit("alice", "bob");
Recruit("alice", "carol");
Recruit("bob", "dave");
Recruit("bob", "erin");
Recruit("carol", "frank");

Sale("alice", 100.0);
Sale("bob", 200.0);
Sale("carol", 150.0);
Sale("dave", 300.0);
Sale("erin", 50.0);
Sale("frank", 400.0);
```

## Solution

```
# A member's bonus starts with their own sales...
Bonus(x) += s :- Sale(x, s);

# ...plus half of the bonus earned by each person they recruited
Bonus(x) += 0.5 * Bonus(y) :- Recruit(x, y);
```

## Expected Results

```
+-------+--------------+
| col0  | logica_value |
+-------+--------------+
| alice | 462.5        |
| bob   | 375.0        |
| carol | 350.0        |
| dave  | 300.0        |
| erin  | 50.0         |
| frank | 400.0        |
+-------+--------------+
```

Leaf members (`dave`, `erin`, `frank`) have no recruits, so their bonus is just their own sales. `bob`'s bonus is his own sales (200) plus half of `dave` and `erin`'s combined bonus (0.5 × 350 = 175), giving 375. `alice`'s bonus then rolls up half of `bob` and `carol`'s bonuses on top of her own sales: 100 + 0.5 × (375 + 350) = 462.5.
