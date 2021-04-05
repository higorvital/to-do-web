import ISubcategory from "./ISubcategory";

interface ITask {
    id: string;
    title: string;
    date?: string;
    time?: string;
    completed: boolean;
    description?: string;
    subcategory?: ISubcategory;
    created_at: string;
}

export default ITask;