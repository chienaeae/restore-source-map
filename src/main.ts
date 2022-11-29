import { hello, name } from "./constants";
import _ from "lodash";

export default function main() {
  const line = _.capitalize(`${hello} ${name}!`);
  console.log(line);
}
