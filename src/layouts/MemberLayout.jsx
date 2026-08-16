export function MemberLayout() {
  return (
    <AppShell
      navigation={memberNavigation}
      section="Member"
      workspace="Motorcycle care"
      user={memberUser}
    />
  );
}
