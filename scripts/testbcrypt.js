const bcrypt = require("bcryptjs");

(async () => {
  const senhaPlana = "minhasenha";
  const hash = await bcrypt.hash(senhaPlana, 10);

  const valid = await bcrypt.compare("minhasenha", hash);
  console.log(valid); // true
})();
