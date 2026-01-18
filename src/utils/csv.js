import Papa from 'papaparse';

export const loadCSV = async (lang = 'en') => {
    try {
        const fileName = lang === 'ja' ? '/data_jp.csv' : '/data.csv';
        const response = await fetch(fileName);

        // Fallback for missing file if needed, but assuming it exists
        if (!response.ok) {
            console.warn(`Failed to load ${fileName}, falling back to English`);
            return loadCSV('en');
        }

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
