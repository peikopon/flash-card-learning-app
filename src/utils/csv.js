import Papa from 'papaparse';

export const loadCSV = async () => {
    try {
        const response = await fetch('/data.csv');
        const csvText = await response.text();

        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const data = results.data.map((row, index) => {
                        // Fix known data issue
                        let section = row.Section;
                        if (section === '1' && row.Content === 'AWS Audit Manager') {
                            section = 'Security, Identity, and Compliance';
                        }

                        return {
                            id: row.Content || `item-${index}`,
                            section: section,
                            content: row.Content,
                            details: row.Details,
                            link: row.Link
                        };
                    }).filter(item => item.content); // Ensure valid items

                    resolve(data);
                },
                error: (err) => {
                    reject(err);
                }
            });
        });
    } catch (error) {
        console.error("Failed to load CSV", error);
        return [];
    }
};
