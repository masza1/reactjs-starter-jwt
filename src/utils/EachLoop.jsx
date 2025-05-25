import { Children } from "react";

export const EachLoop = ({ render, of }) =>
    Children.toArray(
        of.map((item, index) => {
            const key = item?.id || index;
            const renderedElement = render(item, index);

            return <Fragment key={key}>{renderedElement}</Fragment>;
        })
    );
