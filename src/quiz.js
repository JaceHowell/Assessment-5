import pg from "pg";
const { Client } = pg;

// Setting Up Postgres in Node
const client = new Client({
  // Your postgres user
  user: "User",
  // Postgres password (was set as null during orientation)
  password: null,
  host: "localhost",
  port: 5432,
  database: "cupcakes",
});

await client.connect();

// Problem 01
export const problem01 = await client.query(`
  SELECT email FROM customers
  ORDER BY email;
`); 
console.log('-- Problem 01 --');
console.log(problem01?.rows);

// Problem 02
export const problem02 = await client.query(`
    SELECT id FROM orders
    WHERE customer_id=1;
    `);
console.log('-- Problem 02 --');
console.log(problem02?.rows);

// Problem 03
export const problem03 = await client.query(`
    SELECT SUM(num_cupcakes) FROM orders
    WHERE processed=false;
    `);
console.log('-- Problem 03 --');
console.log(problem03?.rows);

// Problem 04
export const problem04 = await client.query(`
    SELECT c.name, SUM(o.num_cupcakes) AS sum FROM cupcakes AS c LEFT JOIN orders AS o ON c.id = o.cupcake_id GROUP BY c.name ORDER BY c.name;
    `);
// console.log('-- Problem 04 --');
// console.log(problem04?.rows);

// Problem 05
export const problem05 = await client.query(`
    SELECT c.email, SUM(o.num_cupcakes) AS total_cupcakes FROM customers AS c LEFT JOIN orders AS o ON c.id = o.customer_id GROUP BY c.email ORDER BY total_cupcakes DESC;
    `);
// console.log('-- Problem 05 --');
// console.log(problem05?.rows);

// Problem 06
export const problem06 = await client.query(`
    SELECT DISTINCT c.fname, c.lname, c.email FROM customers AS c LEFT JOIN orders AS o ON c.id = o.customer_id WHERE o.cupcake_id = '5' AND o.processed = 't';
    `);
console.log('-- Problem 06 --');
// console.log(problem06?.rows);

client.end();