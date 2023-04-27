import { ProcessReceipt } from './ReceiptApi';
import { AddBudgetByUpload } from '../../Repository/Database';

export async function BudgetUploader(currentUser, image, amount) {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
        const imageBase64 = reader.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
        console.log(typeof imageBase64, "imageBase64");

        // Verify API credentials
        const clientId = 'vrfJ3iyFF57hGKb3YE18PtBEUJyLUE9GxyAoWfV';
        const clientSecret = 'hpNmOuFrHejYsxf5PjMuGlYi7FjB2e1Eu9rWIb3OPG2voXEOnDaz38GR3yeaE0G7d35URvREYBAeMbHv7TWuXUrntPoDOA63RbYh2h4nX0heznxXmRke2Sro37jKkitJ';
        const username = 'othniel99.ot';
        const apiKey = 'b77770908d10ee50ede5743da685a46d';

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

