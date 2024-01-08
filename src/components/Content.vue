<template>
  <div class="graph-container"></div>
</template>
<script  lang="ts" setup>
import { onMounted } from "vue";
import { Graph, Path } from "@antv/x6";
import Hierarchy from "@antv/hierarchy";
import insertCss from "insert-css";
import { bottom } from "@antv/x6/lib/registry/port-layout/line";
//引入类型
import { mindmapData } from "../types/types";
import { addEdge, topicTheme } from "../config/dataConfig";
let graph: Graph;
// 定义svg样式属性同样
onMounted(() => {
  //rect node
  const commonAttr = {
    body: {
      rx: 6,
      ry: 6,
      fill: "red",
    },
  };
  Graph.registerNode(
    "topic-theme",
    {
      inherit: "rect",
      markup: [
        {
          tagName: "rect",
          selector: "body",
        },
      ],
      attrs: commonAttr,
      ports: {
        groups: {
          top: {
            position: "top",
            attrs: {
              circle: {
                magnet: true,
                stroke: "#8f8f8f",
                r: 5,
              },
            },
          },
          bottom: {
            position: "bottom",
            attrs: {
              circle: {
                magnet: true,
                stroke: "red",
                r: 5,
              },
            },
          },
        },
      },
    },
    true
  );
  // 创建边
  Graph.registerEdge(
    "mindmap-edge",
    {
      inherit: "edge",
      connector: {
        name: "mindmap",
      },
      attrs: {
        line: {
          targetMarker: "",
          stroke: "#A2B1C3",
          strokeWidth: 2,
          // color:"red"
        },
      },
      zIndex: 0,
    },
    true
  );

  //创建连接器
  Graph.registerConnector(
    "mindmap",
    (sourcePoint, targetPoint, routerPoints, options) => {
      const midX = sourcePoint.x + 10;
      const midY = sourcePoint.y;
      const ctrX = (targetPoint.x - midX) / 5 + midX;
      const ctrY = targetPoint.y;
      const pathData = `
     M ${sourcePoint.x} ${sourcePoint.y}
     L ${midX} ${midY}
     Q ${ctrX} ${ctrY} ${targetPoint.x} ${targetPoint.y}
    `;
      return options.raw ? Path.parse(pathData) : pathData;
    },
    true
  );

  //创建画布

  graph = new Graph({
    container: document.querySelector(".graph-container"),
    autoResize: true,
    panning: true,
    connecting: {
      connectionPoint: "anchor",
    },
  });

  // 创建画布数据
  const data: mindmapData = {
    id: "1",
    type: "topic-theme",
    label: "中心主题",

    children: [
      {
        id: "1-1",
        type: "topic-branch",
        label: "分支主题1",
        children: [
          {
            id: "1-1-1",
            type: "topic-child",
            label: "子主题1",
          },
          {
            id: "1-1-2",
            type: "topic-child",
            label: "子主题2",
          },
        ],
      },
      {
        id: "1-2",
        type: "topic-branch",
        label: "分支主题2",
      },
    ],
  };

  //创建一个父节点
  const result: Hierarchy = Hierarchy.mindmap(data, {
    direction: "H",
  });
  const Cells = [];
  const render = (item) => {
    if (item) {
      console.log(item);
      Cells.push(topicTheme(graph, item.data, item));
      if (item.children) {
        item.children.forEach((cell) => {
          Cells.push(addEdge(graph, item, cell));
          render(cell);
        });
      }
    }
  };
  render(result);
  graph.resetCells(Cells);
  console.log(Cells);

  graph.centerContent();
});
</script>
<style scoped>
.graph-container {
}
</style>