<script lang="ts">
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import BugBuddy from '$lib/BugBuddy.svelte';
  import coldCoilResistanceImg from './cold-coil-resistance.jpg';

</script>

<div class="container">
  <h1>Mod Box Guide</h1>
  <h3>Terms, features & horribilities explained</h3>

  <h4>What's a Mod Box? </h4>
  <p>It's simply a device which provides electrical power for the heating coil(s) in an attached tank (atomiser).  So with a modern regulated mod (i.e. one that can be set by Wattage) you connect your tank to the mod, dial in your chosen Wattage (heating power is measured in Watts). And when activated (by pressing the "Fire" button), the mod attempts to drive the coil(s) at this Wattage.</p>

  <h4>Inaccuracies: Dialled-in vs Actual Wattages</h4>
  <p>In short, be aware that Wattage settings cannot be regarded as seamlessly portable between different mod models/firmware, and can produce significantly different outputs, even with the same settings/conditions. And also, set & actual Wattage can also vary significantly.  I've encountered the following issues so far.</p>
  <ul>
    <li><strong>Internal resistance</strong> The Original Geekvape Solo appears to provide a correction factor for this, but others seem to produce theoretical Wattages based upon an assumption of zero ohms internal resistance. I'm still researching this, and will update when more is known.  </li>
    <li>Stainless Steel Firmware Bug This issue only affects certain mods when fitted with coil materials that increase resistance with temperature (e.g. Stainless Steel) but <strong>Kanthal A1 is OK, as is Ni80 because its resistance increase with temp is minimal</strong>). During a fire cycle, mods should continuously measure resistance & make Voltage corrections to maintain desired Wattage.  However, some mods only do this when the coil is still cold, which results in an uncorrected drop in power as the coil heats up.
So far I've seen this affecting Geekvape Max V1, Geekvape Z50, and Thelema Solo Quest and Smok Rigel (also the Vandy Vape Pulse 3 suffers from a variant of this bug) but suspect many others also have this flaw. There are a few workarounds, perhaps the easiest is to use Kanthal or Ni80 coils. </li>

  </ul>
  <h6>Proven workaround options for using stainless steel coils with affected mods</h6>
  <ul>
    <li>Set a higher Wattage on your mod to compensate (see graph & Bug Buddy below) </li>
    <li>Use Kanthal or Ni80 coils, not SS316L or Ni200 (quite rare anyway)</li>
    <li>
      For the Thelema Solo & Z50 (may not work on others),
      <ul>
        <li>once the coil is up to temperature, quickly release, then immediately re-press/hold the fire button</li>
        <li>Reset coil, set to "Ni" mode (or TC-TCR with TCR set to its max value), and use "Watts" in this mode to set the Wattage you wish to use </li>
      </ul>
    </li>
  </ul>

  <LayoutGrid>
    <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
      <img src={coldCoilResistanceImg} alt="Cold Coil Resistance" width="100%">
    </Cell>
    <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
      <BugBuddy />
    </Cell>
  </LayoutGrid>
</div>

<style>
  h1 {
    margin-top: 40px;
  }

  h3 {
    text-align: center;
    font-style: italic;
    margin-bottom: 40px;
  }
</style>
