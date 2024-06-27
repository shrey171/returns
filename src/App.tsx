import { Amount, Chart, DropDown, TextInput } from "components";
import { ISchema, Schema } from "utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCalculate } from "utils/useCalculate";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISchema>({
    resolver: zodResolver(Schema),
    defaultValues: { inflation: 0 },
  });

  const { calculate, values, datasets, labels } = useCalculate();
  const { netProfit, grossProfit, lostToInflation, invested } = values;

  return (
    <main className="grid gap-24 min-h-screen w-10/12 mx-auto py-12 text-dark-gray lg:py-20 xl:gap-24 max-w-5xl">
      <section className="flex flex-col gap-20 justify-center items-center lg:items-start lg:flex-row">
        <form
          onSubmit={handleSubmit(d => calculate(d))}
          className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 sm:flex-row">
            <TextInput
              {...register("increment", { valueAsNumber: true })}
              error={errors.increment?.message}
              className="basis-full"
            />
            <DropDown
              array={["monthly", "annual"]}
              {...register("mode")}
              label="Frequency"
              error={errors.mode?.message}
              className="basis-full"
            />
          </div>
          <div className="flex gap-4">
            <TextInput
              {...register("inflation", { valueAsNumber: true })}
              error={errors.inflation?.message}
              label="Inflation (%)"
              className="col-span-2"
            />
            <TextInput
              {...register("rate", { valueAsNumber: true })}
              error={errors.rate?.message}
              label="Rate (%)"
              className="col-span-2"
            />
            <TextInput
              {...register("years", { valueAsNumber: true })}
              error={errors.years?.message}
              className="col-span-2"
            />
          </div>
          <button className="text-sm font-medium drop-shadow-md tracking-wide uppercase rounded-lg col-span-full py-4 md:py-6 w-full transition-all duration-500 bg-accent text-white hover:bg-[#0056b3]">
            Avada Kedavra
          </button>
        </form>
        <div className="flex flex-col gap-3 w-full text-xl items-center lg:h-full">
          <Amount
            amount={invested}
            invested={invested}
            label="Invested"
            className="text-invested"
            showRatio
          />
          <Amount
            amount={grossProfit}
            label="Gross"
            invested={invested}
            className="text-gross"
            showRatio
          />
          <Amount
            amount={lostToInflation}
            label="Inflation"
            invested={invested}
            className="text-red-600"
            showRatio
          />
          <Amount
            amount={netProfit}
            label="Net"
            invested={invested}
            showRatio
            className="text-net mt-auto"
          />
        </div>
      </section>
      <Chart datasets={datasets} labels={labels} />
    </main>
  );
}

export default App;
