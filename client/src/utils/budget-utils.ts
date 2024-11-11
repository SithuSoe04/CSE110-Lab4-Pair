import { API_BASE_URL } from "../constants/constants";

export const fetchBudget = async (): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`);
    // console.log(response.json());
	if (!response.ok) {
    	throw new Error('Failed to fetch budget');
	}

	// Parsing the response to get the data
	let budget = response.json().then((jsonResponse) => {
    	console.log("data in fetchBudget", jsonResponse);
    	return jsonResponse.data;
	});

	console.log("response in fetchBudget", budget);
	return budget;
};

export const updateBudget = async (budget: number): Promise<number> => {
	const newBudget = {"budget": budget}
    const response = await fetch(`${API_BASE_URL}/budget`, {
    	method: "PUT",
    	headers: {
        	"Content-Type": "application/json",
    	},
    	body: JSON.stringify(newBudget),
	});
	if (!response.ok) {
    	throw new Error("Failed to update budget");
	}
	return response.json();
};
