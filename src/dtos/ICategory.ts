import ISubcategory from "./ISubcategory";

interface ICategory {
    id: string;
    name: string;
    subcategories: ISubcategory[];
}

export default ICategory;