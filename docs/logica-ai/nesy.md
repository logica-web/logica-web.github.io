---
outline: deep
---

# NeSy (Neuro-Symbolic AI)

Because the real world involves both strict and defeasible (i.e., exception-prone) rules, our goal is to create an environment where engineers and scientists can use Logica to enforce strict rules while delegating more flexible, defeasible reasoning to LLMs. This approach exemplifies Neuro-Symbolic AI, combining the interpretability and rigor of symbolic rules with the adaptability and generative power of neural models.

```
%%logica TripRequest

@Engine("sqlite");

# Employee nationality facts
Employee("Alice", nationality:"US");
Employee("Bob", nationality:"UK");
Employee("Charlie", nationality:"Canada");

# Trip data
Trip(employee:"Alice", destination:"Japan", cost:3000);
Trip(employee:"Bob", destination:"China", cost:1800);
Trip(employee:"Charlie", destination:"Mongolia", cost:1500);

# Strict eligibility rule: cost < 2000
EligibleTrip(employee, destination, cost) :-
  Trip(employee:employee, destination:destination, cost:cost),
  cost < 2000;

# Ask the LLM if the employee needs a visa – now includes nationality
NeedVisaAssessment(nationality, destination) =
  "Does a citizen of " ++ nationality ++
  " need a visa to travel to " ++ destination ++
  "? Provide difficulty level (Easy, Medium, Hard) and a short explanation.";

# Combine strict and flexible reasoning
TripRequest(employee, destination, cost, visa:visa) :-
  Trip(employee:employee, destination:destination, cost:cost),
  Employee(employee, nationality:nationality),
  visa = Intelligence(NeedVisaAssessment(nationality, destination)),
  EligibleTrip(employee, destination, cost);

  ```