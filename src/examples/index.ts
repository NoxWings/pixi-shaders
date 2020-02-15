import { default as triangle } from "./00_triangle";
import { default as colors } from "./01_colors";
import { default as noise_gradient } from "./02_noise_gradient";
import { default as card_current } from "./03a_card_current";
import { default as card_filter } from "./03b_card_filter";

export default [
    {
        name: "Example: Basic Triangle",
        path: "/triangle",
        setup: triangle
    },
    {
        name: "Exercise 1: Playing with colors",
        path: "/colors",
        setup: colors
    },
    {
        name: "Exercise 2: Noise gradient",
        path: "/noise-gradient",
        setup: noise_gradient
    },
    {
        name: "Example: Current Card animation",
        path: "/card-flipbook",
        setup: card_current
    },
    {
        name: "Example: Card animation with filter",
        path: "/card-filter",
        setup: card_filter
    }
];
