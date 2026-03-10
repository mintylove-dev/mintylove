<script lang="ts">
  import Card from '@smui/card';
  import Select, { Option } from '@smui/select';
  import Textfield from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text';

  type Material = 'SS304' | 'SS316L' | 'NI80' | 'A1' | 'Custom';
  type TemperatureUnit = 'C' | 'F';

  let requiredWattage = $state(20);

  /** Temperature in °C */
  let temperature = $state(190);
  let temperatureUnit = $state<TemperatureUnit>('C');
  let material = $state<Material>('SS304');
  let tcr = $state(105);
  let wattage = $state(23.57);

  /** Ambient temperature in °C */
  const ambientTemperature = 20;
  const calculateWattage = () => (1 + ((tcr / 100000) * (temperature - ambientTemperature))) * requiredWattage;

  const setRequiredWattage = (value: number) => {
    requiredWattage = value;
    wattage = calculateWattage();
  };

  const displayTemperature = () => temperatureUnit === 'C'
    ? temperature // temperature is already in °C
    : (temperature * 1.8) + 32; // convert from °C to °F
  const setTemperature = (value: number) => {
    temperature = temperatureUnit === 'C'
      ? value // value is already °C
      : (value - 32) / 1.8; // convert from °F to °C
    wattage = calculateWattage();
  };
  const setTemperatureUnit = (value: TemperatureUnit) => {
    temperatureUnit = value;
    wattage = calculateWattage();
  };

  const setMaterial = (value: Material) => {
    material = value;
    tcr = material === 'SS304' ? 105
      : material === 'SS316L' ? 95
      : material === 'NI80' ? 12
      : material === 'A1' ? 0
      : tcr;
    wattage = calculateWattage();
  };
  const setTcr = (value: number) => {
    tcr = value;
    material = 'Custom';
    wattage = calculateWattage();
  };

  const setWattage = (value: number) => {
    wattage = value;
    requiredWattage = wattage / (1 + ((tcr / 100000) * (temperature - ambientTemperature)));
  };
</script>

<Card padded>
  <h4>Bug Buddy v1.0</h4>
  <span class="subtitle">Calculates Watts offset for mods affected by the Stainless Steel firmware bug</span>

  <div class="form">
    <div class="row">
      <div class="field">
        <Textfield
          type="number"
          label="Required O/P Wattage"
          input$step="any"
          bind:value={() => requiredWattage, setRequiredWattage}
        >
          {#snippet helper()}
            <HelperText>Required O/P Wattage</HelperText>
          {/snippet}
        </Textfield>
      </div>
    </div>

    <div class="row">
      <div class="field" style="flex: 1">
        <Textfield type="number" label="Temperature" bind:value={displayTemperature, setTemperature}>
          {#snippet helper()}
            <HelperText>Coil Temperature</HelperText>
          {/snippet}
        </Textfield>
      </div>
      <div class="field" style="flex-shrink: 0; width: 80px;">
        <Select label="" bind:value={() => temperatureUnit, setTemperatureUnit}>
          <Option value={'C'}>°C</Option>
          <Option value={'F'}>°F</Option>
        </Select>
      </div>
    </div>

    <div class="row">
      <div class="field" style="flex: 1">
        <Textfield type="number" label="TCR" bind:value={() => tcr, setTcr}>
          {#snippet helper()}
            <HelperText>Material TCR</HelperText>
          {/snippet}
        </Textfield>
      </div>
      <div class="field" style="flex-shrink: 0; width: 150px;">
        <Select label="Material" style="width: 100%;" bind:value={() => material, setMaterial}>
          <Option value={'SS304'}>SS304</Option>
          <Option value={'SS316L'}>SS316L</Option>
          <Option value={'NI80'}>Nichrome NI80</Option>
          <Option value={'A1'}>Kanthal A1</Option>
          <Option value={'Custom'}>Custom...</Option>
        </Select>
      </div>
    </div>

    <div class="row">
      <div class="field">
        <Textfield type="number" label="Wattage" input$step="any" bind:value={() => wattage, setWattage}>
          {#snippet helper()}
            <HelperText persistent>Wattage to set on mod</HelperText>
          {/snippet}
        </Textfield>
      </div>
    </div>
  </div>
</Card>

<style>
  h4 {
    text-align: center;
  }

  .subtitle {
    text-align: center;
    margin-bottom: 20px;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .row {
      display: flex;
      align-items: flex-start;
      gap: 10px;

      .field {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
    }
  }
</style>
