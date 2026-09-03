import AppBarChart from "@/src/app/components/AppBarChart";
import { AppPieChart } from "@/src/app/components/AppPieChart";
import { ChartAreaGradient } from "@/src/app/components/AreaChart";
import CardList from "@/src/app/components/CardList";
import TodoList from "@/src/app/components/TodoList";

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
       <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2"> <AppBarChart/> </div>
       <div className="bg-primary-foreground p-4 rounded-lg"> <AppPieChart/>  </div>
       <div className="bg-primary-foreground p-4 rounded-lg"> <CardList title="Popular Products"/> </div>
       <div className="bg-primary-foreground p-4 rounded-lg"> <TodoList/> </div>
       <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2"><ChartAreaGradient/></div>
       <div className="bg-primary-foreground p-4 rounded-lg"><CardList title="Latest transaction"/></div>
    </div>
  );
}
