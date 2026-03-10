<script lang="ts">
  import { mdiMenu } from '@mdi/js';
  import Drawer, { AppContent, Content, Header, Scrim, Title as DrawerTitle } from '@smui/drawer';
  import IconButton, { Icon } from '@smui/icon-button';
  import List, { Item, Text } from '@smui/list';
  import TopAppBar, { AutoAdjust, Row, Section, Title } from '@smui/top-app-bar';
  import { asset } from '$app/paths';
  import { page } from '$app/state';
  import favicon from '$lib/assets/favicon.svg';

  let topAppBar: TopAppBar | null = $state(null);
  let drawerOpen = $state(false);
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/mod-boxes', label: 'Mod Boxes' },
  ];

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />

  <!-- SMUI Styles -->
  <link rel="stylesheet" href={asset('/smui.css')} media="(prefers-color-scheme: light)" />
  <link rel="stylesheet" href={asset('/smui-dark.css')} media="screen and (prefers-color-scheme: dark)" />

  <!-- Roboto, and Roboto Mono fonts -->
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital@0;1&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
  />
</svelte:head>

<Drawer variant="modal" fixed={false} bind:open={drawerOpen}>
  <Header>
    <DrawerTitle>Minty Love</DrawerTitle>
  </Header>
  <Content>
    <List>
      {#each navItems as item}
        <Item href={item.href} onclick={() => drawerOpen = false}>
          <Text>{item.label}</Text>
        </Item>
      {/each}
    </List>
  </Content>
</Drawer>
<Scrim fixed={false} />
<AppContent>
  <TopAppBar bind:this={topAppBar} variant="standard">
    <Row>
      <Section>
        <IconButton class="desktop-hide" onclick={() => drawerOpen = true}>
          <Icon tag="svg"><path d={mdiMenu} /></Icon>
        </IconButton>
        <Title>Minty Love</Title>
        <nav class="mobile-hide">
          {#each navItems as item}
            <a href={item.href} class:active={page.url.pathname === item.href}>{item.label}</a>
          {/each}
        </nav>
      </Section>
    </Row>
  </TopAppBar>

  <AutoAdjust {topAppBar}>
    {@render children()}
  </AutoAdjust>
</AppContent>

<style>
  :global {
    .container {
      box-sizing: border-box;
      margin: 0 auto;
    }

    @media (max-width: 839px) {
      .mobile-hide {
        display: none !important;
      }
    }

    @media (min-width: 840px) {
      .desktop-hide {
        display: none !important;
      }
    }

    /* phone */
    @media (max-width: 479px) {
      .container {
        padding: 0 16px;
      }
    }

    /* tablet */
    @media (min-width: 480px) and (max-width: 839px) {
      .container {
        padding: 0 32px;
      }
    }

    /* extra small desktop */
    @media (min-width: 840px) and (max-width: 959px) {
      .container {
        max-width: 800px;
        padding: 0 24px;
      }
    }

    /* small desktop */
    @media (min-width: 960px) and (max-width: 1279px) {
      .container {
        max-width: 900px;
        padding: 0;
      }
    }

    /* medium desktop */
    @media (min-width: 1280px) and (max-width: 1439px) {
      .container {
        max-width: 960px;
        padding: 0;
      }
    }

    /* large desktop */
    @media (min-width: 1440px) and (max-width: 1599px) {
      .container {
        max-width: 1200px;
        padding: 0;
      }
    }

    /* extra large desktop */
    @media (min-width: 1600px) {
      .container {
        max-width: 1200px;
        padding: 0;
      }
    }
  }

  nav {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
    margin-left: 40px;

    a {
      color: #fff;
      text-decoration: none;
    }

    a.active {
      font-weight: bold;
    }
  }
</style>
