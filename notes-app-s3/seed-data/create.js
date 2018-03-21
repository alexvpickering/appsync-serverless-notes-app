const fs = require("fs");
const jsonfile = require("jsonfile");

const item = {
  blah: "1234",
  foo: "bar"
};

console.log(JSON.stringify(item));

jsonfile.writeFileSync("item.json", item, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log("data created successfully");
  }
});
