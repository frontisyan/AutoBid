// Упрощенная версия БД для тестирования
const users = [];
let idCounter = 1;

const pool = {
  query: (text, params) => {
    console.log('SQL:', text, params);
    
    // Эмуляция INSERT
    if (text.includes('INSERT INTO users')) {
      const newUser = {
        id: idCounter++,
        email: params[0],
        password_hash: params[1],
        name: params[2],
        role: 'user',
        deposit_balance: 0.00
      };
      users.push(newUser);
      return { rows: [newUser] };
    }
    
    // Эмуляция SELECT по email
    if (text.includes('SELECT') && text.includes('email = $1')) {
      const user = users.find(u => u.email === params[0]);
      return { rows: user ? [user] : [] };
    }
    
    // Эмуляция SELECT по id
    if (text.includes('SELECT') && text.includes('id = $1')) {
      const user = users.find(u => u.id === params[0]);
      return { rows: user ? [user] : [] };
    }
    
    return { rows: [] };
  }
};

const initDatabase = async () => {
  console.log('✅ In-memory database initialized (for testing)');
  return Promise.resolve();
};

module.exports = { pool, initDatabase };