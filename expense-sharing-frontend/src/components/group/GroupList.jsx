import GroupCard from "./GroupCard";

const GroupList = ({ groups }) => {
  if (!groups.length) {
    return <p>No groups found</p>;
  }

  return (
    <>
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </>
  );
};

export default GroupList;
