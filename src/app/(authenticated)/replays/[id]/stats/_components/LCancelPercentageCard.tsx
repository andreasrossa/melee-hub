"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ChartContainer, type ChartConfig } from "~/components/ui/chart";

const chartConfig = {
  lCancelPercentage: {
    label: "L-Cancel Percentage",
    color: "hsl(var(--chart-1))",
  },
  test: {
    label: "Test",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function LCancelPercentageCard({ value }: { value: number }) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>L-Cancel Percentage</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-2 pt-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px] min-h-[200px]"
        >
          <RadialBarChart
            data={[{ lCancelPercentage: value }]}
            startAngle={0}
            endAngle={250}
            innerRadius={50}
            outerRadius={80}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar
              dataKey="lCancelPercentage"
              fill={chartConfig.lCancelPercentage.color}
              background
              cornerRadius={10}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              {/* <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {value.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 24}
                          className="fill-muted-foreground"
                        >
                          L-Cancel %
                        </tspan>
                      </text>
                    );
                  }
                }}
              /> */}
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
