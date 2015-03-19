---
title: Fix GRUB after Windows Installation
author: Wyatt Johnson
layout: post
permalink: /fix-grub-after-windows-installation
disqus: //wyattjoh.ca/fix-grub-after-windows-installation
path: 2012-03-03-fix-grub-after-windows-installation.md
---

Sometimes, when us linux users have to install Windows to do something or another, we have to fix our GRUB boot loader after windows wipes it out of existence. I made a very quick guide here on how to make the corrections via a live CD.

First, we must boot into linux via the live CD. I used a version of Backtrack 5, but you can really use any you want. Then, with:

{% highlight bash %}
fdisk -l
{% endhighlight %}

We can identify all the partitions on the system.

{% highlight bash %}
mount /dev/sda5 /mnt
grub-install –root-directory=/mnt/ /dev/sda
{% endhighlight %}

This will place GRUB onto the MBR again, allowing us to add details to its installation. Then we must update the menu for our GRUB bootloader by pretending to be the active installation of linux. We do this by binding our local directories to the mounted linux directory.

{% highlight bash %}
mount –bind /proc /mnt/proc
mount –bind /dev /mnt/dev
mount –bind /sys /mnt/sys
{% endhighlight %}

Now that we have binded our directories, we can then move on to update the grub menus:

{% highlight bash %}
chroot /mnt update-grub
{% endhighlight %}

This will list off the active partitions being added to the menu. Our final step is to unmount all the binded directories first, and then unmount the drive:

{% highlight bash %}
umount /mnt/sys
umount /mnt/dev
umount /mnt/proc

umount /mnt
reboot
{% endhighlight %}

After that last reboot, you should have a working copy of GRUB after windows went and ate it :)
