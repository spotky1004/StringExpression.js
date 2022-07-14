import StringExpression from "../StringExpression.js";
import Variables from "../Variables.js";
const variableNameRegexp = /^[A-Za-z][A-Za-z0-9]*$/;
export default function parseStringVariables(str, sepctrator = ";") {
    const variables = new Variables("number", "string");
    const lines = str.split(sepctrator).filter(line => line !== "");
    for (const line of lines) {
        try {
            const [variableName, expression] = line.split("=").map(v => v.trim());
            if (!variableNameRegexp.test(variableName))
                throw Error(`Invaild varialbe name: ${variableName}`);
            const strExpr = new StringExpression(expression);
            if (!strExpr.isVaild)
                throw Error(`Invaild expression: ${expression}\n${strExpr.parseError}`);
            const result = strExpr.eval(variables);
            variables.set(variableName, result);
        }
        catch (e) {
            if (e instanceof Error) {
                throw Error(`Error occurred while evaluating expression.\n\t${e.message}`);
            }
        }
    }
    return variables;
}
