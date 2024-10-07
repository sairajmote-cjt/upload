const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload-product-images', upload.array('images'), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No images uploaded.' });
    }

    const processedImages = req.files.map((file) => {
        const [productId, ...filenameParts] = file.originalname.split('-');
        const originalName = filenameParts.join('-');
        return {
            originalName,
            productId,
        };
    });
    res.json({ message: 'Images received successfully', images: processedImages });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});