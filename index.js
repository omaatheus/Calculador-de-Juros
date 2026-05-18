const formatarMoeda = (valor) => {
  return parseFloat(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const aplicarMascaraMoeda = (input) => {
    let valor = input.value.replace(/\D/g, "");
    if (valor === "") {
        input.value = "";
        return;
    }
   
    valor = (parseInt(valor) / 100).toFixed(2) + "";
    valor = valor.replace(".", ",");
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    input.value = "R$ " + valor;
};

const aplicarMascaraTaxa = (input) => {
    let valor = input.value.replace(/\D/g, "");
    if (valor === "") {
        input.value = "";
        return;
    }
    valor = (parseInt(valor) / 100).toFixed(2) + "";
    valor = valor.replace(".", ",");
    input.value = valor + "%";
};

async function calcularRendimento() {
  const LAMBDA_URL =
    "FUNÇÃO_LAMBDA_URL_AQUI";

  const capitalInput = document.getElementById("capital").value;
  const taxaInput = document.getElementById("taxa").value;
  const meses = document.getElementById("meses").value;

  const capital = parseFloat(capitalInput.replace(/\D/g, "")) / 100;
  const taxa = parseFloat(taxaInput.replace(/\D/g, "")) / 100;

  const btn = document.getElementById("btnCalcular");
  const boxSucesso = document.getElementById("boxSucesso");
  const boxErro = document.getElementById("boxErro");
  const txtErro = document.getElementById("txtErro");

  boxSucesso.style.display = "none";
  boxErro.style.display = "none";

  if (!capital || !taxa || !meses) {
    txtErro.innerText = "Por favor, preencha todos os campos do formulário.";
    boxErro.style.display = "flex";
    return;
  }

  btn.innerText = "Calculando...";
  btn.disabled = true;

  const payload = {
    capital: capital,
    taxa: taxa,
    meses: meses,
  };

  try {
    const response = await fetch(LAMBDA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById("resCapital").innerText = formatarMoeda(capital);
      document.getElementById("resLucro").innerText = formatarMoeda(data.lucro);
      document.getElementById("resMontante").innerText = formatarMoeda(
        data.montante,
      );

      boxSucesso.style.display = "block";
    } else {

      txtErro.innerText =
        data.error || "Erro na simulação. Verifique os valores.";
      boxErro.style.display = "flex";
    }
  } catch (error) {

    txtErro.innerText =
      "Sistema indisponível no momento. Tente novamente mais tarde.";
    boxErro.style.display = "flex";
    console.error(error);
  } finally {
    btn.innerText = "Realizar Simulação";
    btn.disabled = false;
  }
}
