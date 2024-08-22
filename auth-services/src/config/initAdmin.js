const User = require('../models/User');

const initAdmin = async () => {
  try {
    // Verificar si ya hay usuarios en la base de datos
    const userCount = await User.countDocuments();

    if (userCount === 0) {
      // Si no hay usuarios, crear un nuevo usuario administrador
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD;

      if (!adminEmail || !adminPassword) {
        throw new Error('Las variables ADMIN_EMAIL y ADMIN_PASSWORD deben estar definidas en el archivo .env');
      }

      const adminUser = new User({
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });

      await adminUser.save();
      console.log('Usuario administrador creado con éxito');
    } else {
      console.log('Ya existen usuarios en la base de datos. No se necesita crear un administrador.');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

module.exports = initAdmin;
