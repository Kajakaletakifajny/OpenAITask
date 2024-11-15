import 'dotenv/config';
import fs from 'fs';
import fetch from 'node-fetch'; 

const API_KEY = process.env.OPENAI_API_KEY;


function readArticle(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}


async function generateHtmlContent(articleContent) {
    const prompt = `
        Przekształć poniższy artykuł w kod HTML, używając odpowiednich tagów do strukturyzacji treści. 
        Dodaj znaczniki <img src="image_placeholder.jpg" alt="prompt do generacji obrazu"> 
        w miejscach, gdzie warto wstawić grafikę, oraz umieść podpisy pod obrazkami w odpowiednim tagu HTML. 
        Kod HTML ma być odpowiedni do wstawienia pomiędzy <body> i </body>. 
        Nie używaj stylów CSS ani JavaScript. Artykuł:
        
        ${articleContent}
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-4", 
            messages: [
                {
                    role: "system",
                    content: "Jesteś pomocnym asystentem konwertującym artykuły na kod HTML."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 2048,
            temperature: 0.5,
        }),
    });

    const data = await response.json();
    console.log('Debug: Response from OpenAI API:', data); 

    
    if (data.error) {
        throw new Error(`Błąd API OpenAI: ${data.error.message}`);
    }

    if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
        throw new Error('Odpowiedź API jest nieprawidłowa lub brak wyników');
    }

    
    return data.choices[0].message.content.trim();
}


function saveHtml(filePath, htmlContent) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, htmlContent, 'utf8', (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}


async function main() {
    const articleFilePath = 'artykul.txt';
    const outputHtmlFilePath = 'artykul.html';

    try {
        
        const articleContent = await readArticle(articleFilePath);

        const htmlContent = await generateHtmlContent(articleContent);

        await saveHtml(outputHtmlFilePath, htmlContent);

        console.log("Wygenerowany kod HTML zapisano w pliku:", outputHtmlFilePath);
    } catch (error) {
        console.error("Wystąpił błąd:", error);
    }
}

main();
