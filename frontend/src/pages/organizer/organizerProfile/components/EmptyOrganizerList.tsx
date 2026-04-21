function EmptyOrganizerList({ dataName }: { dataName: string }) {
  return (
    <p className=" py-2 px-5 text-sm text-zinc-400">
      No {dataName} data is found
    </p>
  );
}

export default EmptyOrganizerList;
