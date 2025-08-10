require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('API is working ✅');
});

app.get('/api/products', async (req, res) => {
  try {
    const { search, category } = req.query;

    const products = await prisma.product.findMany({
      where: {
        AND: [
          search ? { name: { contains: String(search), mode: 'insensitive' } } : {},
          category ? { category: { slug: String(category) } } : {}
        ]
      },
      include: { category: { select: { slug: true, name: true } } },
      orderBy: { id: 'asc' }
    });

    res.json(products);
  } catch (err) {
    console.error('GET /api/products error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: { select: { slug: true, name: true } } }
    });

    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (err) {
    console.error('GET /api/products/:id error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});
