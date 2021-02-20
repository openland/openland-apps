package com.openland.app

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Parcelable
import org.json.JSONObject
import android.provider.MediaStore
import org.json.JSONArray
import java.net.URLEncoder


class ShareDummyActivity : Activity() {


    override fun onStart() {
        super.onStart()
        onIntent(intent)
    }


    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        onIntent(intent)
    }

    private fun onIntent(intent: Intent?) {

        if (intent != null && intent.action === Intent.ACTION_SEND) {
            var files = JSONArray()
            var strings = JSONArray()

            (intent.getParcelableExtra<Parcelable>(Intent.EXTRA_STREAM) as? Uri)?.let {
                val proj = arrayOf(MediaStore.Images.Media.DATA)
                val cursor = applicationContext.contentResolver.query(it, proj, null, null, null)
                val columnIndex = cursor!!.getColumnIndexOrThrow(proj[0])
                if (cursor != null && cursor.moveToFirst()) {
                    do {
                        files.put(cursor.getString(columnIndex))
                    } while (cursor.moveToNext())
                    cursor.close()
                }
            }

            intent.getStringExtra(Intent.EXTRA_TEXT)?.let {
                strings.put(it)
            }

            val res = Intent(Intent.ACTION_VIEW)
            val data = JSONObject()

            if(files.length() > 0){
                data.put("files", files)
            }
            if(strings.length() > 0){
                data.put("strings", strings)
            }

            res.data = Uri.parse("openland://deep/share?data=" + URLEncoder.encode(data.toString(), "utf8"))
            startActivity(res)

        }

        finish()
    }
}
