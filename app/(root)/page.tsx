import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartCandlestick, SquarePlus, TicketSlash } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 py-4 md:gap-8 md:p-8">
      <section>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {/* card 1 asset in odou */}
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                اصول منظومة الاودو
              </CardTitle>
              <ChartCandlestick className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15,567</div>
              <p className="text-xs text-muted-foreground">
                ثم اضافة 500 اصل من الشهر الفائت
              </p>
            </CardContent>
          </Card>
          {/* card 2 asset in Rmadan */}
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                اصول منظومة رمضان
              </CardTitle>
              <ChartCandlestick className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">11,987</div>
            </CardContent>
          </Card>
          {/* card 3 asset inverory */}
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                اصول ثم جردها
              </CardTitle>
              <TicketSlash className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,234</div>
            </CardContent>
          </Card>
          {/* card 4 asset in asset add  */}
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                اصول ثم اضاتها اثناء الجرد
              </CardTitle>
              <SquarePlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">573</div>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* <section>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
          <BarChartMultiple />
          <RadialChartText />
        </div>
      </section> */}
    </main>
  );
}
