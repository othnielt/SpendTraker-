import { ProcessReceipt } from './ReceiptApi';
import { AddBudgetByUpload } from '../../Repository/Database';

export async function BudgetUploader(currentUser, image, amount) {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
        const imageBase64 = reader.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
        console.log(typeof imageBase64, "imageBase64");

        //replace by your own  Verify API credentials
        const clientId = '';
        const clientSecret = '';
        const username = '';
        const apiKey = '';

        const response = await ProcessReceipt(imageBase64, clientId, clientSecret, username, apiKey);

        console.log("Response:", response);

        const lineItems = response.line_items;

        console.log("uuuseer", currentUser);
        // console.log("name",name);
        console.log("mazzx", amount);
        console.log("linetdderm", response.line_items)


        // function AddBudgetByUpload from database 
        await AddBudgetByUpload(currentUser, amount, response);

        return lineItems;
    };
}

