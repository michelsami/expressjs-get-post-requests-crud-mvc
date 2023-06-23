import * as utils from '../routes/export-all.js';


const reArrangeData = (allProductsFromAPI)=>{
	const dataStructured = {};

	allProductsFromAPI.forEach(product => {
		if(dataStructured[product.category.id]){
			dataStructured[product.category.id].products.push(product)
		}else{
			dataStructured[product.category.id] = {
				category: {
					id: product.category.id,
					name: product.category.name,
					
				  }, 
				products: [
					product
				]  
			};

		}
	});
	
	return Object.values(dataStructured);
	
}

const changeCurrencyRate = (allProductsFromAPI, currencyRate)=>{
	return allProductsFromAPI.map( element =>({...element, price : element.price * currencyRate})) 
}

// importing products from API
export let getDataWithCustomisedCurrency = async (currencyString) => {
	const [productsFromAPI, currencyRateEGP] = await Promise.all([
		utils.fetchData(`${utils.projectRoutes.mainURL}${utils.projectRoutes.products}${utils.projectRoutes.onlyFirst10Products}`), 
		utils.fetchData(`${utils.projectRoutes.currencyRateURL}`).then(res => res.rates[currencyString]), 
	])
	
	const productsAfterCurrencyConvertion = changeCurrencyRate(productsFromAPI, currencyRateEGP)
	const dataFormatted = reArrangeData(productsAfterCurrencyConvertion);

	console.log(dataFormatted)
	
	return dataFormatted;
  }; 


