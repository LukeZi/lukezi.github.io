const testCount = document.getElementById('testCount');
const result = document.getElementById('result');

function updateConfigurator() {

  const count = Number(testCount.value);
  const monitoring = document.getElementById('monitoring').checked;
  const automation = document.getElementById('automation').checked;

  let price = count * 5;

  if(monitoring) price += 50;
  if(automation) price += 100;

  let rating = 'Standard';

  if(price > 200) {
    rating = 'Enterprise';
  }

  result.innerHTML = `
    <h3>Recommended Plan</h3>
    <p>Estimated Price: $${price}</p>
    <p>Performance Tier: ${rating}</p>
  `;
}

document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', updateConfigurator);
});

updateConfigurator();