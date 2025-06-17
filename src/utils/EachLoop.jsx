import { Children, Fragment } from "react";

export const EachLoop = ({ render, of }) => {
	// console.log("EachLoop called with of:", of);
	// console.log(typeof of, Array.isArray(of), of instanceof Array);
	return Children.toArray(
		of.map((item, index) => {
			const key = item?.id || index;
			const renderedElement = render(item, index);

			return <Fragment key={key}>{renderedElement}</Fragment>;
		})
	);
};
