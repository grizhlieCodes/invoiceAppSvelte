<script>
  export let status
</script>

<style lang="scss">
  .status {
    width: 10.4rem;
    height: 4rem;
    font-weight: v(font-bold);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;

    div {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      margin-right: 0.8rem;
    }

    p {
      font-weight: v(font-bold);
      text-transform: capitalize;
    }
  }

  .status {
    transition: color 200ms ease, background 200ms ease;

    div {
      transition: background 200ms ease;
    }
  }

  .status.paid {
    color: v(invoices-paid-status-text);
    background: v(invoices-paid-status-bg);
    div {
      background: v(invoices-paid-status-text);
    }
  }
  .status.draft {
    color: v(invoices-draft-status-text);
    background: v(invoices-draft-status-bg);
    div {
      background: v(invoices-draft-status-text);
    }
  }
  .status.pending {
    color: v(invoices-pending-status-text);
    background: v(invoices-pending-status-bg);
    div {
      background: v(invoices-pending-status-text);
    }
  }
</style>

<div class="status {status}">
  <div />
  <p class="normal">{status}</p>
</div>
