function BypassCD(user) {
    const userarr = ['751225225047179324', '809259609700302935', '927221951439700058', '786816081032773662', '729671009631862834', '1084992470074531960']
    var CDBool = false
    const a = user
    for (var i in userarr) {
        if (a === userarr[i]) {
            CDBool = true
        }
    }
    return CDBool
}
CDBool = BypassCD(user)
export { CDBool }