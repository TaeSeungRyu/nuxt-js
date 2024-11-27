<script setup lang="ts">
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

const router = useRouter();

const movePage = () => {
  router.push("/account/signin");
};

const randomstring = randomString(10);
onMounted(() => {
  //Chart.register(ChartDataLabels);

  setTimeout(() => {
    const ctx: any = document.getElementById(randomstring);
    console.log("ctx", ctx);
    if (ctx != null) {
      new Chart(ctx, {
        //plugins: [ChartDataLabels],
        type: "bar",
        data: {
          labels: [
            "2024-01-01",
            "2024-01-02",
            "2024-01-03",
            "2024-01-04",
            "2024-01-05",
            "2024-01-06",
            "2024-01-07",
          ],
          datasets: [
            {
              label: "판매건수",
              data: [12, 19, 3, 5, 2, 3, 11],
              borderWidth: 0,
              borderRadius: 10,
              backgroundColor: "#FFDD55",
              barThickness: 10,
            },
            {
              label: "",
              data: [0, 0, 0, 0, 0, 0, 0],
              borderWidth: 0,
              backgroundColor: "#fff",
              barThickness: 5,
            },
            {
              label: "판매금액",
              data: [12, 19, 3, 5, 2, 3, 8],
              borderWidth: 0,
              borderRadius: 10,
              backgroundColor: "#3496F8",
              barThickness: 10,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: false,
              display: false,
              grid: {
                display: false,
              },
            },
            x: {
              beginAtZero: false,
              grid: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || "";
                  if (label) {
                    label += "건";
                  }
                  console.log("label", label);
                  return label;
                },
              },
              backgroundColor: "white",
              borderColor: "#EAEAEA",
              borderWidth: 1,
              titleColor: "#333",
              bodyColor: "#333",
            },
          },
        },
      });
    }
  }, 550);
});
</script>
<template>
  <div class="h-full">
    <NuxtLayout :name="'container'">
      <div
        style="width: 1688px; height: 326px"
        class="flex items-center justify-center"
      >
        <div style="width: 1500px; height: 250px">
          <ClientOnly>
            <canvas :id="randomstring" width="1508" height="230"></canvas>
          </ClientOnly>
        </div>
      </div>

      <div>
        <button @click="movePage">z222221111zzzz</button>
      </div>
    </NuxtLayout>
  </div>
</template>
