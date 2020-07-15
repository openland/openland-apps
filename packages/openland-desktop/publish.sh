DO_KEY_ID=PRJZY37IZUB5RFHPEGYC DO_SECRET_KEY=xTtlg9rpCR+QUm1M7/dfFsXojAHO+mHuoPBBYfcizLM yarn electron-builder -mwl --publish always
VERSION=$(node -p "require('./package.json').version")
REBRANDLY_API_KEY='6a9fc9498090450fb079293bfb5c6dcf'

function update_link() {
  id=$1
  title=$2
  dest=$3
  curl -s "https://api.rebrandly.com/v1/links/$id" \
    -X POST \
    -H 'Content-Type: application/json' \
    -H "apikey: $REBRANDLY_API_KEY" \
    -d \
"{
  \"id\": \"$id\",
  \"title\": \"$title\",
  \"destination\": \"$dest\"
}" > /dev/null
}

# Linux
echo '🔄 Updating Linux link...'
update_link \
 '6925f0f94a6d4c9bbc806cf48178b577' \
 'digitaloceanspaces.com' \
 "https://openland-updates.sfo2.digitaloceanspaces.com/Openland-$VERSION.AppImage"

# Windows
echo '🔄 Updating Windows link...'
update_link\
 'bcdeef5432d7496c9aeabdef528f15f1' \
 'digitaloceanspaces.com' \
 "https://openland-updates.sfo2.digitaloceanspaces.com/Openland%20Setup%20$VERSION.exe"

# Mac
echo '🔄 Updating Mac link...'
update_link \
 '6498622d852e4dc5ac0986f3034a59ca' \
 'digitaloceanspaces.com' \
 "https://openland-updates.sfo2.digitaloceanspaces.com/Openland-$VERSION.dmg"

echo '✅ Done'