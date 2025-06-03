export const fetchDataPlans = async () => {
  try {
    const response = await fetch("/src/user/data_plan/full_data_plans.json");
    return await response.json();
    console.log(response.json());
  } catch (error) {
    console.error("Error fetching data plans:", error);
    return [];
  }
};
