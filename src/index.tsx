import { h, render, FunctionalComponent } from "preact";
import { useRef, useEffect } from "preact/hooks";
import { Router, RoutableProps } from "preact-router";
import { createHashHistory } from "history";
import examples from "./examples";

// -----------------------------------------------------------------------------
// Main page
// -----------------------------------------------------------------------------

const Navigation: FunctionalComponent = () =>
    <Router history={createHashHistory()}>
        <ExampleList path="/" default/>
        {examples.map(example => <ExamplePage {...example} />)}
    </Router>
;

const ExampleList: FunctionalComponent = () =>
    <div>
        <h1>Examples</h1>
        {examples.map(example => <h3><a href={example.path}>{example.name}</a></h3>)}
    </div>
;

// -----------------------------------------------------------------------------
// Template page for examples
// -----------------------------------------------------------------------------

type CleanupCallback = () => void;
type SetupCallback = (canvas: HTMLCanvasElement) => CleanupCallback | void;
export interface ExampleProps extends RoutableProps {
    name: string;
    setup: SetupCallback;
}

export const ExamplePage: FunctionalComponent<ExampleProps> = (props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => props.setup(canvasRef.current), [canvasRef]);

    return <div>
        <h1 class="title">{props.name}</h1>
        <canvas class="" ref={canvasRef}></canvas>
    </div>;
}

render(<Navigation></Navigation>, document.body);
