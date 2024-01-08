import { mindmapData } from "../types/types";

export const topicTheme = (graph, item, origin) => {
    switch (item.type) {
        case "topic-theme":
            return graph.createNode({
                id: item.id,
                width: 160,
                height: 50,
                x: origin.x,
                y: origin.y,
                shape: item.type,
            });
        case "topic-branch":
            return graph.createNode({
                id: item.id,
                width: 100,
                height: 40,
                x: origin.x,
                y: origin.y,
                shape: 'topic-theme',
            });
        case "topic-child":
            return graph.createNode({
                id: item.id,
                width: 60,
                height: 30,
                x: origin.x,
                y: origin.y,
                shape: 'topic-theme',
            });
    }
};

// 添加边

export const addEdge = (graph, src, tar) => {
    console.log(src, tar);

    return graph.createEdge({
        shape: "mindmap-edge",
        source: {
            cell: src.data.id,
            anchor:
                src.data.type === "topic-child"
                    ? {
                        name: "right",
                        args: {
                            dx: -26,
                        },
                    }
                    : {
                        name: "center",
                        args: {
                            dx: "25%",
                        },
                    },
        },
        target: {
            cell: tar.data.id,
            anchor: {
                name: "left",
            },
        },
    });
};
