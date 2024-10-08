import axios from 'axios';

export const csvExport = async (path, filename) => {
    try {
        const response = await axios({
            url: `${path}`,
            method: 'GET',
            responseType: 'blob',
        });

        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error exporting ', error);
        alert('Failed to export');
    }
};
