import { getDataWithCustomisedCurrency } from "./dataArrange.js";
import { z } from 'zod';

export async function sendResponseWithTheRequestedCurrency(req, res) {
	try {
		 
		
		const currencyRequested = req.query.cur.toUpperCase();
		
		const responseReady = JSON.stringify(await getDataWithCustomisedCurrency(currencyRequested))
		
		res.setHeader('Content-type', 'application/json')		
		res.send(responseReady)
		
		
		//console.log(currencyRequested)
		// res.send("responseReady")
		
	} catch (error) {
	  console.error(error);
	}
  }

export const postRequest = (req, res)=>{

	

const productSchema = z.object({
	title: z.string().min(2),
	price: z.number().int().min(0),
	description: z.string().min(2),
	categoryId: z.number().int().min(1),
	images: z.array(z.string()),
	
  });	

	const responseToBe = {
		"title": "New Product",
		"price": 10,
		"description": "A description",
		"images": ["https://placeimg.com/640/480/any"],
		"category": {
		  "id": 1,
		  "name": "Clothes",
		  "image": "https://api.lorem.space/image/fashion?w=640&h=480&r=4278",
		  "creationAt": "2023-01-03T15:58:58.000Z",
		  "updatedAt": "2023-01-03T15:58:58.000Z"
		},
		"id": 210,
		"creationAt": "2023-01-03T16:51:33.000Z",
		"updatedAt": "2023-01-03T16:51:33.000Z"
	  };



			const responseBody = req.body;

		
			try {
				const product = productSchema.parse(responseBody);
				//console.log(product);

				res.setHeader('Content-type', 'application/json')		
				res.send(JSON.stringify(responseToBe))
			
			  } catch (error) {
				console.error(error);
				//console.error(`here : ${error["errors"][0].message}`);
				const arrayOfIssues = []

				
				res.setHeader('Content-type', 'application/json')	
				res.writeHead(400, "Please adhear to the instructions sent")
				for(let i =0; i < error["issues"].length ; i++){
					const errorObj = {
						issueKey : error["issues"][i].path[0],
						issueDetails : error["errors"][i].message
					}
					arrayOfIssues.push(errorObj)
				}
				res.write(JSON.stringify(arrayOfIssues))

				//res.write()

				
				res.end()
			  }
			
			//console.log(JSON.parse(chuncks))
	//	})

  }