function OrderHeader() {
  return (
    <div>
      <header className="flex justify-center space-y-2">
        <div>
          <h1 className="text-3xl text-center font-medium text-zinc-900 tracking-tight">
            Orders
          </h1>
          <p className="text-zinc-400 text-sm text-center pt-3 pb-8">
            Manage ticket sales and confirm attendee payments.
          </p>
        </div>
      </header>
    </div>
  );
}

export default OrderHeader;
