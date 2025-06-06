export const fetchDataPlans = async () => {
  try {
    const response = await fetch("/src/user/data_plan/dataPlan.json");
    const plans = await response.json();
    return plans;
  } catch (error) {
    console.error("Error fetching data plans:", error);
    return [];
  }
};

export const getDataPlansByType = async (planType) => {
  try {
    const allPlans = await fetchDataPlans();
    const filteredPlans = allPlans.filter(
      (plan) => plan.plan_type === planType
    );

    return {
      planType,
      plans: filteredPlans,
    };
  } catch (error) {
    console.error(`Error getting ${planType} plans:`, error);
    return {
      planType,
      plans: [],
    };
  }
};
