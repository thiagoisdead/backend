const bcrypt = require("bcryptjs");

(async () => {
  const senhaPlana = "senhateste";
  const hash = await bcrypt.hash(senhaPlana, 10);

  const valid = await bcrypt.compare("senhateste", hash);
  console.log(valid); 
})();
