<script lang="ts">
  interface Props {
    text?: string
  }
  let { text }: Props = $props()
</script>

<div class="divider">
  {#if text}
    <span>{text}</span>
  {/if}
</div>

<style>
  .divider {
    display: flex;
    align-items: center;
    text-align: center;
    width: 100%;
    color: #666;
  }

  .divider::before,
  .divider::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #ccc;
  }

  .divider:not(:empty)::before {
    margin-right: 0.75em;
  }

  .divider:not(:empty)::after {
    margin-left: 0.75em;
  }

  span {
    white-space: nowrap;
  }
</style>
