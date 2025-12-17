import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getAllTransactions = async() => {
    try{
        const res = await API.get("/transactions/transactions");
        return res.data;
    } catch(err){
        console.log(err);
    }
}

export const createNewExpense = async (data) => {
    try {
        const res = await API.post("/expenses/add-expense", data);
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const getAllExpenses = async () => {
    try {
        const res = await API.get("/expenses/get-expenses");
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const deleteExpense = async (id) => {
    try {
        const res = await API.delete(`/expenses/delete-expense/${id}`);
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const updateExpense = async (id, data) => {
  try {
    const res = await API.put(`/expenses/update-expense/${id}`, data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export const createNewIncome = async (data) => {
    try {
        const res = await API.post("/incomes/add-income", data);
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const getAllIncomes = async () => {
    try {
        const res = await API.get("/incomes/get-incomes");
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const deleteIncome = async (id) => {
    try {
        const res = await API.delete(`/incomes/delete-income/${id}`);
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const updateIncome = async(id,data) =>{
    try {
    const res = await API.put(`/incomes/update-income/${id}`, data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}