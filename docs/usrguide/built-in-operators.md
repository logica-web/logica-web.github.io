---
outline: deep
---
# Built-in operators

Arithmetic operators and comparison operators can be used in rules.

Example 1: Profit from a property is equal to revenue minus expenses.

```
PropertyProfit(property_id, revenue - expenses) :-
  PropertyRevenue(property_id, revenue),
  PropertyExpense(property_id, expense);
```

Example 2:  Profitable property is a property with positive profit.

```
Profitable(property_id) :-
  PropertyProfit(property_id, profit),
  profit > 0;
```