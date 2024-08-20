import db from "../firestore"
import { collection, getDocs, query, where } from "firebase/firestore"

import { Blend, Product } from "@/types/types"


export const getProducts = async (category: string): Promise<Product[]> => {
     const productsCollection = collection(db, "products");
			const q = query(productsCollection, where("category", "==", category));
			const querySnapshot = await getDocs(q);
    const products: Product[] = []

    querySnapshot.forEach((product) => {
        const data = { ...product.data(), id: product.id } as Product
        products.push(data)
    })

    return products
    
}

export const getBlends = async (): Promise<Blend[]> => {
	const querySnapchot = await getDocs(collection(db, "beans"));
	const blends: Blend[] = [];

	querySnapchot.forEach((product) => {
		const data = { ...product.data(), id: product.id } as Blend;
		blends.push(data);
	});

	return blends;
};

export const getSingleProduct = async (slug: string): Promise<Product | null> => {
	try {
		const productsCollection = collection(db, 'products')
		const q = query(productsCollection, where('slug', '==', slug))
		const querySnapshot = await getDocs(q)

		if (querySnapshot.empty) {
			return null
		}

		   const productDoc = querySnapshot.docs[0];
				const product = {
					id: productDoc.id,
					...productDoc.data(),
				} as Product;

				return product;

	} catch (error) {
		console.log('Error fetching Product', error);
		throw new Error('Unable to fetch the Required Product')
	}
}